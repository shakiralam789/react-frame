import { useTranslations } from "next-intl";
import Page from "../partial/Page";

export default function Dashboard() {
  const t = useTranslations();
  return <Page title={"Dashboard"}>{t("welcome")}</Page>;
}
