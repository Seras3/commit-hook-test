// commitlint.config.js
module.exports = {
  rules: {
    "gitlab-task-prefix": [2, "always", ["DEV", "PROD"]],
  },
  plugins: [
    {
      rules: {
        "gitlab-task-prefix": ({ raw }, _, prefixes) => {
          const prefixRegex = (prefix) =>
            new RegExp(`^\\[${prefix}-\\d+\\]\\s[A-Z]`);

          const result = prefixes.some((prefix) =>
            prefixRegex(prefix).test(raw)
          );

          console.log(`Subject: ${raw}`);
          console.log(`PREFIXES: ${prefixes}`);
          console.log(
            `TEST DEV: ${prefixRegex("DEV").test("[DEV-1234] New Test")}`
          );
          console.log(`TEST PROD: ${prefixRegex("PROD").test(raw)}`);
          console.log(`Result: ${result}`);

          return [
            result,
            `Your subject should respect this form: 
    [<prefix>-<number>] <description>

    <prefix> - ${prefixes.join(" | ")}
    <number> - number
    <description> - string (Capitalize first word)

    Valid example:
    [DEV-1234] Some commit Name HERE
            `,
          ];
        },
      },
    },
  ],
};
