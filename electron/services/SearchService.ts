import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { SearchWidgetReturn } from "../../types/Installation";
import { IWidgetConfig } from "../../types/global";
import uniqid from "uniqid";

/**
 * Search widgets inside folder
 *
 * @param folderPath - path to folder
 * @return {SearchWidgetReturn[]} - object {folderPath: string, config: IWidgetConfig}
 */
export function searchWidgetInFolder(folderPath: string): SearchWidgetReturn[] {
  const returnedWidgets: SearchWidgetReturn[] = [];

  // if find package json stop folder scan
  const widgetStartFile = path.join(folderPath, "index.json");
  const isExist = existsSync(widgetStartFile);

  // [algorithm] recursive folder scanning algorithm
  try {
    if (isExist) {
      const widget: SearchWidgetReturn | null =
        readWidgetConfigureFile(folderPath);

      if (widget !== null) returnedWidgets.push(widget);
      return returnedWidgets;
    } else {
      // find dirs name only
      const dirs: Array<string> = readdirSync(folderPath).filter((file) =>
        statSync(folderPath + "/" + file).isDirectory()
      );
      if (dirs.length === 0) return returnedWidgets;

      dirs.map((item: string) => {
        returnedWidgets.push(
          ...searchWidgetInFolder(path.join(folderPath, item))
        );
      });

      return returnedWidgets;
    }
  } catch (err) {
    console.error("SearchService ERROR \n", err);
    return [];
  }
}

/**
 * Read and transform configuration file and give unic id
 *
 * @param folderPath
 * @returns
 */
const readWidgetConfigureFile = (
  folderPath: string
): SearchWidgetReturn | null => {
  const fileContent: string = readFileSync(
    path.join(folderPath, "index.json"),
    "utf8"
  );

  const { content, isValid } = validateWidgetEntryFile(fileContent);
  if (!isValid || content === null) return null;

  return {
    id: uniqid(),
    folderPath: folderPath,
    config: content,
  };
};

type validateWidgetEntryFileReturn = {
  isValid: boolean;
  content: IWidgetConfig | null;
};

/**
 * Parse json file and validate here
 *
 * @param fileContent
 * @returns content: obj and isValid: boolean
 */
const validateWidgetEntryFile = (
  fileContent: string
): validateWidgetEntryFileReturn => {
  try {
    let content = JSON.parse(fileContent);
    let isValid = true;

    if (!("name" in content && content.name.length > 0)) isValid = false;
    if (!("preview" in content && content.preview.length > 0)) isValid = false;
    if (!("author" in content && content.author.length > 0)) isValid = false;
    if (!("description" in content && content.description.length > 0))
      isValid = false;
    if (
      !(
        "window" in content &&
        "width" in content.window &&
        "height" in content.window &&
        "entryFile" in content.window
      )
    )
      isValid = false;

    return { isValid, content };
  } catch (err) {
    console.error("ValidateWidgetEntryFileReturn ERROR\n", err);
    return {
      isValid: false,
      content: null,
    };
  }
};
