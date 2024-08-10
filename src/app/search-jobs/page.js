import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div className="grid grid-cols-6 gap-4 max-w-7xl mx-auto">
      <div className="col-span-4 border">
        <div>
          <Button variant="outline"></Button>
        </div>
      </div>
      <div className="col-span-2">sidebar</div>
    </div>
  );
}
