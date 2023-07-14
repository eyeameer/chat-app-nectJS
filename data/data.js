export data={
    name:'ameer',
    id:idUpdate()
}

function idUpdate(){
    let id=1
    setTimeout(()=>{
        id=id+1
    }

   ,20)
   return id
}