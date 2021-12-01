import ReuseVerifyAccount from "../../reuse/authentication/VerifyAccount";

const VerifyAccount = (props) => {
  return (
    <>
      <ReuseVerifyAccount type="two-factor-authentication" />
    </>
  )
}

export default VerifyAccount;