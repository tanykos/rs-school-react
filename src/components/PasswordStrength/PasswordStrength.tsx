import './PasswordStrength.scss';

interface PasswordStrengthProps {
  password: string;
}

const checkStrength = (password: string) => {
  const hasNumber = /[0-9]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialChar = /[@$!%*?&]/.test(password);

  if (password.length === 0) return 'Enter password';
  if (hasNumber && hasUppercase && hasLowercase && hasSpecialChar) return 'Strong';
  if ((hasNumber && hasUppercase) || (hasNumber && hasLowercase) || (hasUppercase && hasLowercase)) return 'Moderate';
  return 'Weak';
};

const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const strength = checkStrength(password);

  return (
    <div>
      <p className="title">Password Strength: {strength}</p>
      <div className="progressBg">
        <div
          className="progressFill"
          style={{
            width: strength === 'Weak' ? '33%' : strength === 'Moderate' ? '66%' : '100%',
            backgroundColor: strength === 'Weak' ? 'red' : strength === 'Moderate' ? 'orange' : 'green',
          }}
        />
      </div>
    </div>
  );
};

export default PasswordStrength;
