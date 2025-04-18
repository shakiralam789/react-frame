import { signal } from "@preact/signals-react";

export const pageTitle = signal("");

export function setPageTitle(title) {
  pageTitle.value = title;
}