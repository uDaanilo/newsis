import { JestConfigWithTsJest } from "ts-jest"
export default <JestConfigWithTsJest>{
	preset: "ts-jest",
	testEnvironment: "./prisma/prisma-test-env.ts",
	testRegex: ".e2e.spec.ts$",
}