import { AdminOrderDetailScreen } from "@/app/modules/admin/screens";

interface Props {
  params: { id: string };
}

export default function AdminOrderDetailPage({ params }: Props) {
  return <AdminOrderDetailScreen orderId={params.id} />;
}
