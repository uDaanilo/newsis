import { JestConfigWithTsJest } from "ts-jest"
export default <JestConfigWithTsJest>{
	preset: "ts-jest",
	testEnvironment: "node",
	testRegex: ".*\\.spec\\.ts$",
}