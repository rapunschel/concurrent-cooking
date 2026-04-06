import {unquote} from "./utils.ts";

export default function getMarkdownMetadata(md: string): Record<string, any> {
    const metablock = md.split("---\n")[1];
    const metalines = metablock.split("\n");
    const rec = {} as Record<string, any>;
    metalines.forEach((line: string): void => {
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

export function getMarkdownData(md : string) : Record<string,any> {
    const rec = {} as Record<string,any>;
    const metablock = "---\n" + md.split("---\n")[1] + "---";
    const body = md.replace(metablock,"");
    const sections = body.split("\n## ");

    rec["introdestruction"] = sections[0];
    sections.slice(1).forEach((section : string) : void => {
        const lines = section.split("\n");
        rec[lines[0]] = lines.slice(1);
        console.log(lines[0], lines.slice(1));
        /* TODO:
            - rm empty lines
            - trim everything
            - go recursive (paragraphs and list items are leaves)
        */
    })

    return rec;
 
}