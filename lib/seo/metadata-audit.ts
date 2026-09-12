import ts from "typescript";

function propertyName(node: ts.PropertyName): string | null {
  return ts.isIdentifier(node) || ts.isStringLiteral(node) ? node.text : null;
}

function textValue(node: ts.Expression): string | null {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isTemplateExpression(node)) {
    return [node.head.text, ...node.templateSpans.map((span) => span.literal.text)].join("${}");
  }
  return null;
}

function isMetadataRoot(object: ts.ObjectLiteralExpression): boolean {
  const parent = object.parent;
  if (ts.isVariableDeclaration(parent) && ts.isIdentifier(parent.name)) {
    return parent.name.text === "metadata";
  }
  return ts.isReturnStatement(parent);
}

export function findUnsafeMetadataTitleSuffixes(sourceText: string, fileName: string): number[] {
  const source = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const lines: number[] = [];

  const visit = (node: ts.Node) => {
    if (ts.isPropertyAssignment(node)
      && propertyName(node.name) === "title"
      && ts.isObjectLiteralExpression(node.parent)
      && isMetadataRoot(node.parent)) {
      const value = textValue(node.initializer);
      if (value?.includes("| 펫지기")) {
        lines.push(source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1);
      }
    }
    ts.forEachChild(node, visit);
  };

  visit(source);
  return lines;
}
