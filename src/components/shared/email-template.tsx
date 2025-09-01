interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate = ({ firstName }: EmailTemplateProps) => {
  return (
    <div>
      <h2>Welcome, {firstName}</h2>
    </div>
  );
};
