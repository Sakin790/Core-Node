// country-তে ডিফল্ট ভ্যালু "Bangladesh"
// age প্যারামিটারটি Optional (?)
function showUser(name: string, age?: number, country: string = "Bangladesh"): string {
  if (age) {
    return `${name} is ${age} years old from ${country}.`;
  }
  return `${name} is from ${country}.`;
}




console.log(showUser("Sakin", 22)); // Output: Sakin is 22 years old from Bangladesh.
console.log(showUser("Rahim"));     // Output: Rahim is from Bangladesh.