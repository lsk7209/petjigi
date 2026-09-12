export async function runPagedImport<T>({
  totalPages,
  fetchPage,
  writeItem,
  onPageComplete,
}: {
  totalPages: number;
  fetchPage: (page: number) => Promise<T[]>;
  writeItem: (item: T) => Promise<void>;
  onPageComplete?: (page: number, written: number) => void;
}): Promise<number> {
  let written = 0;

  for (let page = 1; page <= totalPages; page++) {
    const items = await fetchPage(page);
    if (items.length === 0) break;

    for (const item of items) {
      await writeItem(item);
      written++;
    }

    onPageComplete?.(page, written);
  }

  return written;
}
