import React, { useEffect, useState } from 'react'


export default function App(){
const [health, setHealth] = useState(null)


useEffect(()=>{
fetch('http://localhost:4000/api/health')
.then(r=>r.json()).then(setHealth).catch(()=>setHealth({error:'failed'}))
},[])


return (
<div style={{fontFamily:'sans-serif',padding:24}}>
<h1>Integrated Portal — Starter</h1>
<p>Backend health: {health ? JSON.stringify(health) : 'loading...'}</p>
<p>This is a minimal frontend. Expand with authentication and real UIs.</p>
</div>
)
}