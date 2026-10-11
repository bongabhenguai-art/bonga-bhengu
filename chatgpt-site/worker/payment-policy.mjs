export function paymentPolicy(){
  return {channels:['website','store','app'],requestedFlows:['receive','send'],
    outgoingApprovalRequired:true,providerConsentRequired:true,moneyMovementEnabled:false,
    status:'Authorization required'};
}

export function paymentPreference(record){
  const bank=['Capitec Business','Other South African bank'].includes(record?.bank)?record.bank:'';
  const provider=['PayPal','Bank payment provider','Google Pay gateway'].includes(record?.provider)?record.provider:'';
  // An onboarding record is never proof of an authorized account or completed payment.
  return {bank,provider,country:'ZA',currency:'ZAR',...paymentPolicy(),
    status:bank&&provider?'Authorization required':'Not connected'};
}
