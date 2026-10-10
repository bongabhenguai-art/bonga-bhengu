# Activate bongabhenguos.online

The hostname is attached to the existing Bonga Bhengu OS site. DNS and TLS validation are pending.

Add these records at the domain's DNS provider. For an apex A record, use `@` as the name; enter both addresses as separate records.

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 162.159.143.30 |
| A | @ | 172.66.3.26 |
| TXT | _openai-site-verification | openai-site-verification=TsmQEky7S7e8bOx46trXkyUmuYCqeW-ZlMCsu6aofdM |
| TXT | _cf-custom-hostname | 39e8b431-5571-49df-8a57-711daf882e8a |

These hostnames are relative to `bongabhenguos.online`. If the provider requires full names, append `.bongabhenguos.online` to both TXT names. Preserve unrelated email, verification, and service records. Review existing apex A/AAAA/CNAME records for conflicts before switching traffic.

The existing published site remains available at https://bonga-bhenguai.donlegendwear.chatgpt.site while validation completes. The new hostname should only be treated as active after Sites reports domain and certificate validation successful.
