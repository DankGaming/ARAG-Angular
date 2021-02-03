import { TruncatePipe } from "./truncate.pipe";

describe("truncate pipe tests", () => {
	it("should truncate a string if its too long (>10)", () => {
		const text =
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
		const pipe = new TruncatePipe();
		const result = pipe.transform(text, 10);
		expect(result.length).toBeLessThanOrEqual(10 + 3);
		expect(result.substr(result.length - 3, result.length)).toBe("...");
	});

	it("should return same value", () => {
		const pipe = new TruncatePipe();
		const result = pipe.transform("lorem", 5);
		expect(result.length).toBe(5);
	});

	it("should return empty string", () => {
		const pipe = new TruncatePipe();
		const result = pipe.transform("", 5);
		expect(result.length).toBe(0);
	});

	it("should return same value", () => {
		const pipe = new TruncatePipe();
		const result = pipe.transform("lorem", 10);
		expect(result.length).toBe(5);
	});
});
