const genetic= require("../../modules/genetic/genetic")




let generation = 15 //TODO: esta es la generacion que se esta creando(la actual)

let genetico = new genetic("./data/lianPerformace", generation)

let agents = genetico.orderBy(10)
let routes = genetico.findRoutes(generation, agents, (g, a)=>{
    return `data/gen${generation}/PesosLian_A_` + a
})
genetico.findAgent(routes)


for (let i = 0; i < 100; i++) {
    let newWight = genetico.initWeights(0,0)
    genetico.saveWeight(`data/gen${generation + 1}/PesosLian_A_${i}`, newWight)
}
