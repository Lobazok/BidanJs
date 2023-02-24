const genetic= require("../../modules/algorithms/genetic/genetic")

let genetico = new genetic("./data/lianPerformace", 0)


let generation = 0 //TODO: esta es la generacion que se esta creando(la actual)


let agents = genetico.orderBy(1)
let routes = genetico.findRoutes(generation, agents, (g, a)=>{
    return `data/gen${generation}/PesosLian_A_${a}`
})
genetico.findAgent(routes)


for (let i = 0; i < 1; i++) {
    let newWight = genetico.newWights(0,1)
    genetico.saveWeight(`data/gen${generation + 1}/PesosLian_A_${i}`, newWight)
}
