import { useOrganizationList } from "@clerk/nextjs";
import { FormEventHandler, useState } from "react";

export default function CreateOrganization() {
  const { createOrganization, setActive } = useOrganizationList();
  const [organizationName, setOrganizationName] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      if (!createOrganization) return;
      e.preventDefault();
      const organization = await createOrganization({ name: organizationName });
      setOrganizationName("");
      setActive({ organization });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="organizationName"
        value={organizationName}
        onChange={(e) => setOrganizationName(e.currentTarget.value)}
      />
      <button type="submit">Create organization</button>
    </form>
  );
}
