import { styled, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';


const StyledTextField = styled(TextField)(()=>({
    "& div":{
      backgroundColor:"white"
    }
  }))


export default function AttributeInput({attr,index,handleChange, handleDelete}:any) {
    
  return (
    
    <div style={{display:"flex"}}>
        <div style={{margin:"5px"}}>
            <StyledTextField value={attr.trait_type} placeholder="Trait Type"  onChange={(e: { target: { value: any; }; })=>handleChange({value:e.target.value, index, input:"trait_type"})} defaultValue = "trait" required={true}/>
        </div>
        <div style={{margin:"5px"}}>
            <StyledTextField  placeholder="Value" value={attr.value} type="number"   onChange={(e: { target: { value: any; }; })=>handleChange({value:e.target.value, index, input:"value"})} required={true}/>
        </div>
        <div  style={{margin:"5px"}}>
            <StyledTextField  placeholder="Max Value" value={attr.max_value}  type="number" onChange={(e: { target: { value: any; }; })=>handleChange({value:e.target.value, index, input:"max_value"})} required={true}/>
        </div>
        <div style={{display:"flex", flexDirection:"column",justifyContent:"center"}}> 
            <IconButton  onClick={()=>handleDelete(index)}>
                <DeleteIcon />
            </IconButton>
        </div>
    </div>
   
  )
}