import { AdminOrderDetailScreen } from "@/app/modules/admin/screens";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminOrderDetailPage({ params }: Props) {
  const { id } = await params;
  return <AdminOrderDetailScreen orderId={id} />;
}
