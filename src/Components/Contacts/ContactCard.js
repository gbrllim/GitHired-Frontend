const ContactCard = ({ data }) => {
  return (
    <div className="m-1 rounded-lg bg-primary p-2">
      <p>{data.contactName}</p>
      <p>{data.companyName}</p>
      <p>{data.jobPosition}</p>
      <p>{data.email}</p>
      <p>{data.phoneNumber}</p>
      <p>{data.notes}</p>
      <p>{data.lastContactedDate}</p>
    </div>
  );
};

export default ContactCard;
