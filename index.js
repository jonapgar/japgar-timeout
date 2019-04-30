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
	promise.then(cancel)
	promise.catch(cancel)
	if(def!==undefined) {
		cancelPromise = cancelPromise.catch(e=>{
			zzz[loglevel](e)
			return def
		})
		promise = promise.catch(e=>{
			zzz[loglevel](e)
			return def
		})
	}
	return Promise.race([promise,cancelPromise])
	
}