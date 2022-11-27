import { Button } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Network, Alchemy } from "alchemy-sdk";
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAccount, useContract, useSigner } from "wagmi";
import NFTCard from "../src/NFTCard";
import styles from "../styles/Home.module.css";
import { create } from "ipfs-http-client";
import CreateNewNFT from "../src/CreateNewNFT";
import { toast } from "react-toastify";

const Home: NextPage = () => {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const [alchemy, setAlchemy]: any = useState(null);
  const [nfts, setNFTs]: any = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [fileName, setFileName] = useState("")
  const [attributes, setAttributes] = useState([{trait_type:"",  value:"" ,max_value: ""}])
  const [disabled, setDisabled] = useState(true)

  const nftAddress = "0xE12eA7675f494275F364a4bDAf1A244d6aAB9576";
  const abi =[{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_operator","type":"address"},{"indexed":false,"internalType":"bool","name":"_approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":true,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"_approved","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_tokenURI","type":"string"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"payable","type":"function"}]

  const { data: signer, isError, isLoading } = useSigner();

  const contract = useContract({
    address: nftAddress,
    abi: abi,
    signerOrProvider: signer,
  });

  // const {data, isSuccess,write} = useContractWrite(config)

  useEffect(() => {
    const settings = {
      apiKey: "api-key", // Replace with your Alchemy API Key.
      network: Network.ETH_GOERLI,
    };

    const alchemy = new Alchemy(settings);
    setAlchemy(alchemy);
  }, []);

  const uploadImage = async (e: any) => {
    console.log(e.target.files[0].name);
    const auth =
      "Basic " +
      Buffer.from(
        "" + ":" + ""
      ).toString("base64");
    const client = create({
      url: "https://ipfs.infura.io:5001",
      headers: {
        authorization: auth,
      },
    });
    setFileName(e.target.files[0].name);
    const response = await client.add(e.target.files[0]);
    setImageURL(`https://ipfs.io/ipfs/${response.path}`);
    setDisabled(false)
    console.log(response, "image");
  };

  const createNFT = async () => {
    if (!title || !description ) {
      alert("All field required");
    } else {
      const metaData = {
        name :title,
        description,
        image: imageURL,
        attributes
      };
      const auth =
        "Basic " +
        Buffer.from(
          "" +
            ":" +
            ""
        ).toString("base64");
      const client = create({
        url: "https://ipfs.infura.io:5001",
        headers: {
          authorization: auth,
        },
      });
      const response = await client.add(JSON.stringify(metaData));
      console.log("metaData", metaData)
      const transaction =  await contract?.mint(
        `https://ipfs.io/ipfs/${response.path}`
      )

      setAttributes([{trait_type:"",  value:"" ,max_value: ""}])
      setDescription("")
      setTitle("")
      setFileName("")
      setImageURL(" ")
      setDisabled(true)
      setOpenForm(false)
      toast.success('NFT Created', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

  useEffect(() => {
    
    if (isConnected && alchemy && address && !openForm) {
      fetchNFTs(address);
    }
    if(!isConnected){
      setNFTs([])
    }
  }, [isConnected, alchemy, address, openForm]);

  // useEffect(()=>{
  //    let arr = []
  //    nfts?.map((nft: any, index: any)=>{
  //     arr.push(<NFTCard nft={nft} key={index +`${JSON.stringify(nft)}`} />)
  //    })
  //   // setSlides
  // },[nfts.length])


  async function fetchNFTs(address: string) {
    const nftsForOwner = await alchemy.nft.getNftsForOwner(address);

    for (let index = 0; index < nftsForOwner?.ownedNfts.length; index++) {
      const currentNFT = nftsForOwner?.ownedNfts[index];
      const metaData = await axios(currentNFT?.tokenUri?.raw);

      nftsForOwner.ownedNfts[index].metaData = metaData.data;
    }
    console.log(nftsForOwner.ownedNfts)

    setNFTs(nftsForOwner.ownedNfts);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>NFT Explorer</title>
        <meta
          name="description"
          content="Generated by @rainbow-me/create-rainbowkit"
        />
      </Head>

      <main className={styles.main}>
        <ConnectButton />
       {openForm && isConnected ? (
          <Button
            onClick={() => setOpenForm(false)}
            variant="contained"
            color="secondary"
          >
            All NFTS
          </Button>
        ) : isConnected &&  (
          <Button onClick={() => setOpenForm(true)} variant="contained">
            Create Nft
          </Button>
        )}
      </main>
      {openForm ? (
        <CreateNewNFT
          title={title}
          setTitle={setTitle}
          description={description}
          uploadImage={uploadImage}
          createNFT={createNFT}
          imageURL={imageURL}
          attributes = {attributes}
          setAttributes = {setAttributes}
          setDescription={setDescription}
          disabled = {disabled}
          setDisabled = {setDisabled}
          fileName = {fileName}
        />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {nfts?.map((nft: any, index: any) => (
            <NFTCard nft={nft} key={index + `${JSON.stringify(nft)}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;