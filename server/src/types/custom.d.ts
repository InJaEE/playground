declare namespace Express {
	export interface Response {
		returnSuccess: Function;
		returnError: Function;
	}
}
// export {};

// declare global {
// 	namespace Express {
// 		export interface Response {
// 			returnSuccess(message?: string);
// 			returnError(status: number, message?: string);
// 		}
// 	}
// }
