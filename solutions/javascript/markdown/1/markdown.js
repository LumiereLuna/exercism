function putInElement(text, tag) {
  return `<${tag}>${text}</${tag}>`;
}

function parseFormattedText(line, formattingChars, tag) {
  const regexPattern = new RegExp(`${formattingChars}(.+)${formattingChars}`);
  // The `$1` symbolically represents the contents of the capture template of
  // the regex pattern defined above.
  const replacement = putInElement("$1", tag);
  return line.replace(regexPattern, replacement);
}

function parseTextContent(line, inListElement) {
  line = parseFormattedText(line, "__", "strong");
  line = parseFormattedText(line, "_", "em");
  if (!inListElement) {
    line = putInElement(line, "p");
  }
  return line;
}

function parseHeader(line, inListElement) {
  let headerLevel = 0;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === "#") {
      headerLevel++;
    } else {
      break;
    }
  }

  if (headerLevel === 0 || headerLevel > 6) {
    return [null, inListElement];
  }

  const headerTag = `h${headerLevel}`;
  const headerContent = line.slice(headerLevel + 1);
  const headerElement = putInElement(headerContent, headerTag);
  if (inListElement) {
    headerElement = `</ul>${headerElement}`;
  }
  return [headerElement, false];
}

function parseLineItem(line, inListElement) {
  if (line.startsWith("*")) {
    let listContent = line.slice(2);
    listContent = parseTextContent(listContent, true);
    listContent = putInElement(listContent, "li");
    if (!inListElement) {
      listContent = `<ul>${listContent}`;
    }
    return [listContent, true];
  }
  return [null, inListElement];
}

function parseParagraph(line, inListElement) {
  line = parseTextContent(line, false);
  if (inListElement) {
    line = `</ul>${line}`;
  }
  return [line, false];
}

function parseLine(line, inListElement) {
  let parsedLine;
  [parsedLine, inListElement] = parseHeader(line, inListElement);
  if (parsedLine === null) {
    [parsedLine, inListElement] = parseLineItem(line, inListElement);
  }
  if (parsedLine === null) {
    [parsedLine, inListElement] = parseParagraph(line, inListElement);
  }
  if (parsedLine === null) {
    throw new Error("Invalid markdown");
  }
  return [parsedLine, inListElement];
}

export function parse(markdown) {
  const lines = markdown.split("\n");
  let parsedOutput = "";
  let inListElement = false;
  for (let i = 0; i < lines.length; i++) {
    let parsedLine;
    [parsedLine, inListElement] = parseLine(lines[i], inListElement);
    parsedOutput += parsedLine;
  }
  if (inListElement) {
    parsedOutput = parsedOutput + "</ul>";
  }
  return parsedOutput;
}
