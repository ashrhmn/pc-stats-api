const express = require('express')
const si = require('systeminformation')

const app = express()

app.use(require('cors')({ origin: '*' }))


app.use(require('morgan')('dev'))

// si.getStaticData((data) => {
//     console.log(data.graphics);
// })

const routes = [
    si.audio,
    si.baseboard,
    si.bios,
    si.blockDevices,
    si.bluetoothDevices,
    si.chassis,
    si.cpu,
    si.cpuCache,
    si.cpuCurrentSpeed,
    si.cpuFlags,
    si.cpuTemperature,
    si.currentLoad,
    si.diskLayout,
    si.disksIO,
    si.dockerAll,
    si.dockerContainerProcesses,
    si.dockerContainerStats,
    si.dockerContainers,
    si.dockerImages,
    si.dockerInfo,
    si.dockerVolumes,
    si.fsOpenFiles,
    si.fsSize,
    si.fsStats,
    si.fullLoad,
    si.graphics,
    si.inetChecksite,
    si.inetLatency,
    si.mem,
    si.memLayout,
    si.networkConnections,
    si.networkGatewayDefault,
    si.networkInterfaceDefault,
    si.networkInterfaces,
    si.networkStats,
    si.osInfo,
    si.printer,
    si.processLoad,
    si.processes,
    si.services,
    si.shell,
    si.system,
    si.time,
    si.usb,
    si.users,
    si.uuid,
    si.vboxInfo,
    si.versions,
    si.wifiConnections,
    si.wifiInterfaces,
    si.wifiNetworks

]

// routes.forEach(route => console.log(routes.indexOf(route) + 1, route.name))

// console.log("test :", si);

routes.forEach(route => {
    app.get(`/${route.name}/`, (req, res) => {
        // route(data => {
        //     if (data) return res.json(data)
        //     return res.json({ "Message": "Error" })
        // })

        route()
            .then(data => res.json(data))
            .catch(error => res.json(error))
    })
});

app.get('/battery/', (req, res) => {
    si.battery()
        .then(data => res.json(data))
        .catch(error => res.json(error))
})

app.get('/all/', (req, res) => {
    // si.getAllData(data => {
    //     if (data) return res.json(data)
    //     return res.json({ error: "Error occured" })
    // })

    si.getAllData()
        .then(data => res.json(data))
        .catch(error => res.json(error))
})


app.listen(5000)