import React, {useState, useEffect} from "react";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tarea,setTarea] = useState("")
	const [lista,setLista] = useState([])

	useEffect(()=> {
		//crearUsuario()
		obtenerLista()
	},[])

	useEffect(()=> {
		actualizarLista()
	},[lista])

	const crearUsuario = async() => {
		const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/richardgarcia', {
			method:"POST",
			body: JSON.stringify([]),
			headers: {"Content-Type": "application/json"}
		})
		const data = await response.json() 
		console.log(data)
	}

	const actualizarLista = async() => {
		try{
			const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/richardgarcia', {
				method:"PUT",
				body: JSON.stringify(lista),
				headers: {"Content-Type": "application/json"}
			})
			const data = await response.json() 
			console.log(data)
		} catch(error) {
			console.log(error)
		}
	}
	const obtenerLista = async() => {
		const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/richardgarcia')
		const data = await response.json() 
		console.log(data)
		setLista(data)
	}
	
	function guardarTarea (e) {
		e.preventDefault()
		setLista([...lista,{"label" :tarea,"done" :false}])
		setTarea("")
	}

	function eliminar(id) {
		let listaTareas = []
		listaTareas = lista.filter((item,index)=> {
			if (index != id) {
				return item
			}
		})

		setLista(listaTareas)
	}
	return (
		<div className="text-center container">
			<input className="form-control" type="text" value={tarea} onChange={(e)=>setTarea(e.target.value)}/>
			<button className="btn btn-success" onClick={guardarTarea}> Agregar tarea </button>
			<div>
				<ul className="list-group">
					{lista.map((item,id)=>(
						<li className="list-group-item" key={id}>
							{item.label} 
							<button className="btn btn-danger float-end" onClick={()=>eliminar(id)}>X</button>
						</li>
					
					))}
				</ul>
			</div>
		</div>
	);
};

export default Home;