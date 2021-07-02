// @ts-ignore
let presReq = new PresentationRequest(["receiver/index.html]"])
// @ts-ignore
navigator.presentation.defaultRequest = presReq


let presCon: any

let messageInput: HTMLInputElement
let btnStart: HTMLButtonElement
let btnSendMsg: HTMLButtonElement
let btnTerminate: HTMLButtonElement

const init = () => {
    messageInput = document.querySelector("#messageInput")
    btnStart = document.querySelector("#btnStart")
    btnStart.addEventListener("click", startPres)

    btnSendMsg = document.querySelector("#btnSendMsg")
    btnSendMsg.addEventListener("click", sendMsg)
}

const startPres = async () => {
    try {
        let con = await presReq.start()
        console.log(` > Connected to ${con.url}, id=${con.id}`)
    }
    catch(err) {
        console.error(err)
    }

    presReq.addEventListener("connectionavailable", (e: any) => {
        presCon = e.connection
        presCon.addEventListener("close", () => console.log("connection closed"))
        presCon.addEventListener("terminate", () => console.log("connection terminated"))
        presCon.addEventListener("message", (e: MessageEvent) => console.log(` > ${e.data}`))
    })
}

const sendMsg = () => {
    const message = messageInput.value.trim()
    console.log(`Send msg ${message}`)
    const payload = JSON.stringify({message})
    presCon.send(payload)
}

init()
