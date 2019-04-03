const reject = ({err,rej})=>rej(err)
const {clearLooseTimeout,setLooseTimeout} = require('setloose')()
module.exports = (promise,t=5000,err='Something took too long',def,loglevel='notice')=>{
	let cancel
	let cancelPromise = new Promise((res,rej)=>{
		let timeout = setLooseTimeout(reject,t,{rej,err})
		cancel = ()=>{
			clearLooseTimeout(timeout)
			//just to finish this promise
			res('Timeout canceled')
		}
	})
	let race = Promise.race([promise,cancelPromise])
	promise.then(cancel).catch(zzz[loglevel]) //this could/should get warned errored on elsewhere
	if (def!==undefined) {
		return race.catch(e=>{
			zzz.warn(e)
			return def
		})
	} else {
		return race
	}
}