import { Seo } from "@/lib/seo";
import { metadata } from "@/config/variables";
import { SolutionsContent } from "./components/solutions-content";

export default function SolutionsPage() {
  return <><Seo {...metadata.solutions} /><SolutionsContent /></>;
}
