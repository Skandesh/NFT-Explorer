import { Card, CardContent } from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import React from 'react'

export default function NFTCard({ nft }: any) {

    // console.log(nft.metaData?.attribute, nft.metaData?.attributes)
    return (
        <Card style={{ width: "300px", margin: "10px", padding: "10px" }} >
            <CardMedia
                component="img"
                height="194"
                image={nft.metaData?.image ? nft.metaData?.image : nft.metaData}
                alt={nft.title}
                style={{ width: "auto", margin: "auto" }}
            />
            <CardHeader title={nft.metaData.name ?? nft.metaData?.title} />
            <CardContent style={{ fontSize: "13px" }}>
                {nft.metaData.description}
            </CardContent>
            <div style={{ display: "flex", justifyContent: "space-between" }}>

                {nft.metaData?.attribute && nft.metaData?.attribute.map((item: any, index: any) => (
                    <>

                        <Attributes key={index} attr={item} />
                    </>
                ))}
                {nft.metaData?.attributes && nft.metaData?.attributes.map((item: any, index: any) => (
                    <>

                        <Attributes key={index} attr={item} />
                    </>
                ))}
            </div>
        </Card>
    )
}


const Attributes = ({ attr }: any) => {
  
    return (
        <div style={{ backgroundColor: "black", color: "white", padding: "7px", borderRadius: "10px" }}>{attr?.trait_type}: {attr?.value}</div>
    )
}