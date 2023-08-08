// 更新环境变量

const env = 'dev'; // dev环境 
// const env = 'prd'; // prd环境 
// const env = 'test'; // test环境 


const url = require(`@/env/${env}.json`);
// const url = require(`@/env/prd.json`);
// const url = require(`@/env/test.json`);
export default {
	"NEV_NAME": env,
	...url,
}
