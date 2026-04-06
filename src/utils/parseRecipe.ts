import {unquote} from "./utils.ts";

export default function getMarkdownMetadata(md: string): Record<string, any> {
    const metablock = md.split("---\n")[1];
    const metalines = metablock.split("\n");
    const rec = {} as Record<string, any>;
    metalines.forEach((line: string): void => {
        console.log(line);
        const split = line.split(":");
        const key = split[0];
        const val = unquote(line.slice(key.length + 1).trim());
        if (key == "threads" || key == "time") {
            rec[key] = parseInt(val, 10);
        }
        else if (key == "tags") {
            rec[key] = val.split(",").map((tag: string): string => {
                return tag.trim();
            });
        } else {
            rec[key] = val;
        }
    })
    return rec
}