import { NewProjectForm } from "@/components/admin/new-project-form";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="mb-8 text-[24px] font-black tracking-[-0.01em] uppercase">Nuevo proyecto</h1>
      <NewProjectForm />
    </div>
  );
}
