"use client";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect,useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { error } from "console";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const [error,setError]=useState<string |undefined>();
  const [success,setSuccess]=useState<string |undefined>();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
    setError("Missing token!")
    return;
    }


    newVerification(token).then((data)=>{
setSuccess(data.success);
setError(data.error);
    }).catch(()=>{
        setError("Something went wrong")
    })
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLable="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success &&  !error && (
        <BeatLoader />

        )}
        <FormSuccess message={success}/>
        <FormError message={error}/>
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;