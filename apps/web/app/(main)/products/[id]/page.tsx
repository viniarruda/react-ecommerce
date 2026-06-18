import { ProductDetailScreen } from "@/app/modules/products/screens";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  return <ProductDetailScreen productId={id} />;
}
