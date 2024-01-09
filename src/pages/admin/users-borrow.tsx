import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LayoutPage from "@/layouts/layout-page";

export default function UsersBorrow() {
  return (
    <LayoutPage>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">No</TableHead>
            <TableHead className="text-white">User</TableHead>
            <TableHead className="text-white">Book</TableHead>
            <TableHead className="text-white">Borrow date</TableHead>
            <TableHead className="text-white">Due date</TableHead>
            <TableHead className="text-white">Return date</TableHead>
            <TableHead className="text-white">Edit</TableHead>
            <TableHead className="text-white">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody></TableBody>
      </Table>
    </LayoutPage>
  );
}
