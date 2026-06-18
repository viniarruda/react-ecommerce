import { ProductDetailScreen } from "@/app/modules/products/screens";

interface ProductDetailPageProps {
  params: { id: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return <ProductDetailScreen productId={params.id} />;
}
