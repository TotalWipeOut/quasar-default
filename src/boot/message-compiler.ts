import IntlMessageFormat2 from 'intl-messageformat'
import type { MessageCompiler, MessageContext } from 'vue-i18n'

export const messageCompiler: MessageCompiler = (
  message,
  { locale, key },
) => {
  if (typeof message === 'string') {
    /**
     * You can tune your message compiler performance more with your cache strategy or also memoization at here
     */
    const formatter = new IntlMessageFormat2(message, locale);

    return (ctx: MessageContext): string => {
      // set default plural to be 0 so second param is not required in $t() function
      if (!Object.hasOwn(ctx.values, 'count')) {
        ctx.values.count = 0;
        ctx.values.n = 0;
      }

      return <string>formatter.format(ctx.values) || '';
    }
  }

  return () => key
}
