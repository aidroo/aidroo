"use client";

import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import ProfileEditDialog from "./ProfileEditDialog";

export default function ProfileEditDialogTrigger({ profile }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <>
      <FaRegEdit className="text-lg cursor-pointer" onClick={openDialog} />
      {isOpen && <ProfileEditDialog profile={profile} />}
    </>
  );
}
