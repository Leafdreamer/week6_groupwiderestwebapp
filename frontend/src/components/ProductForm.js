import { useState } from "react"

export default function ProductForm({onAdd}){

const [name,setName]=useState("")
const [category,setCategory]=useState("")
const [price,setPrice]=useState("")
const [quantity,setQuantity]=useState("")

const handleSubmit=(e)=>{

e.preventDefault()

onAdd({
name,
category,
price,
quantity
})

}

return(

<form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6">

<h2 className="text-xl font-bold mb-4">
Add Product
</h2>

<div className="grid grid-cols-2 gap-4">

<input
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
className="p-2 border rounded"
/>

<input
placeholder="Category"
onChange={(e)=>setCategory(e.target.value)}
className="p-2 border rounded"
/>

<input
type="number"
placeholder="Price"
onChange={(e)=>setPrice(e.target.value)}
className="p-2 border rounded"
/>

<input
type="number"
placeholder="Quantity"
onChange={(e)=>setQuantity(e.target.value)}
className="p-2 border rounded"
/>

</div>

<button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
Add Product
</button>

</form>

)

}