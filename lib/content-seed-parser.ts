import ts from "typescript";

function propertyMap(node: ts.ObjectLiteralExpression): Map<string, ts.Expression> {
  const result = new Map<string, ts.Expression>();
  for (const prop of node.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const name = ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name) ? prop.name.text : null;
    if (name) result.set(name, prop.initializer);
  }
  return result;
}

function stringValue(expression: ts.Expression | undefined): string | null {
  if (!expression) return null;
  if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) return expression.text;
  return null;
}

export function sourceValues(expression: ts.Expression | undefined): string[] {
  if (!expression) return [];
  if (
    ts.isCallExpression(expression) &&
    ts.isPropertyAccessExpression(expression.expression) &&
    ts.isIdentifier(expression.expression.expression) &&
    expression.expression.expression.text === "JSON" &&
    expression.expression.name.text === "stringify"
  ) {
    return sourceValues(expression.arguments[0]);
  }
  if (!ts.isArrayLiteralExpression(expression)) return [];
  return expression.elements.flatMap((element) => {
    if (ts.isStringLiteral(element) || ts.isNoSubstitutionTemplateLiteral(element)) return [element.text];
    if (ts.isObjectLiteralExpression(element)) {
      const url = stringValue(propertyMap(element).get("url"));
      return url ? [url] : [];
    }
    return [];
  });
}
