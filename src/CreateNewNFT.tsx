import { Button, TextField, styled } from "@mui/material";
import CustomUploadImage from "./CustomUploadImage";
import AttributeInput from "./AttributeInput";

const StyledTextField = styled(TextField)(()=>({
  "& div":{
    backgroundColor:"white"
  }
}))

export default function CreateNewNFT({
  title,
  setTitle,
  description,
  setDescription,
  uploadImage,
  createNFT,
  imageURL,
  attributes,
  setAttributes,
  fileName,
  disabled
}: any) {

  const handleAttribut = ({value,index,input}:any) => {

    let newArr = attributes.map((attr:any,indx:any)=>{
        if(indx === index){
          attr[input] = value
        }
        return attr
    })
    setAttributes(newArr)
  }

  const handleDelete=(idx:any) => {
    let arr = attributes.filter((atr:any,index:any)=>idx != index )

    setAttributes(arr)
    

  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* <div> */}

      <h2 style={{ textAlign: "center" }}>Create Your NFT</h2>
      <div style={{display:"flex"}}>

      <StyledTextField
        placeholder="Title"
        variant="outlined"
        style={{ width: "300px", margin: "10px" }}
        value={title}
        onChange={(e: { target: { value: any; }; }) => setTitle(e.target.value)}
      />
      <StyledTextField
        placeholder="Description"
        variant="outlined"
        style={{ width: "300px", margin: "10px" }}
        multiline
        value={description}
        onChange={(e: { target: { value: any; }; }) => setDescription(e.target.value)}
      />
      </div>
     

      {/* <label htmlFor="nft" style={{ width: "300px" }}>
      Choose a NFT Asset:
    </label>
    <input
      type="file"
      placeholder="Upload Image"
      name="nft"
      style={{ width: "300px", margin: "10px", marginTop: "0" }}
      accept="image/*"
      onChange={(e) => uploadImage(e)}
      onDragLeave={(e)=>uploadImage(e)}
    /> */}
      {/* </div> */}
      {/* {imageURL ? <img src={imageURL} /> : null} */}
      <div style={{display:"flex",width:"640px"}}>

      {/* <h4 style={{display:"flex", flexDirection:"column", justifyContent:"center"}}> Add Attributes :</h4> */}
      <Button variant="contained"  size="medium" color="secondary"  onClick={()=>setAttributes([...attributes, {trait_type:"",  value:"" ,
  max_value: ""}])}>
    Add Attributes

      </Button>
    </div>
    <div style={{marginTop:"10px" ,marginBottom:"10px"}}>

      {attributes.map((attr: any, index: any) => (
        <AttributeInput key={index} attr={attr} index={index} handleChange={handleAttribut}  handleDelete={handleDelete}/>
        ))}
        </div>
   

      <CustomUploadImage onChange={(e: any) => uploadImage(e)}>
        
        
          <div style={{wordWrap:"break-word", width:"95%" , margin:"auto"}}>{fileName}</div>
   
      </CustomUploadImage>

      <Button variant="contained" onClick={createNFT} disabled = {disabled} size="large">
        Deploy Your NFT
      </Button>
    </div>
  );
}