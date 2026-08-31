import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.error('Uso: npx tsx scripts/hash-password.ts "tu-contraseña"');
  process.exit(1);
}

bcrypt.hash(password, 12).then((hash) => {
  console.log("\nHash bcrypt (pégalo tal cual, sin escapar, en .env):\n");
  console.log(hash);
  console.log();
});
