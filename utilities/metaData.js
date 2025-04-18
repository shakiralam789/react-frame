import { getMessages } from "next-intl/server";

export async function generateMetadata({ locale, title, description = "" }) {
  const messages = await getMessages(locale);

  const titleKey = messages[title];
  const descriptionKey = messages[description] || "";

  return {
    title: `${titleKey || title} | My app`,
    description: descriptionKey || description,
  };
}
