import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SwipeableDrawer,
  TextField,
  Tooltip,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import "./CertificateView.css";

import { fetchCertificate } from "../utils/requestHelper";
import CertificateDto from "../types/models/CertificateDto";
import { getCertificateDto } from "../utils/mapper";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ShareIcon from "@material-ui/icons/Share";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import useBadge from "../utils/useBadge";
import LoadingLinearProgress from "../components/LoadingLinearProgress";

import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "../redux/store";

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const pdfBytes =
  "JVBERi0xLjQKJfbk/N8KMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKL01hcmtJbmZvIDw8Ci9UeXBlIC9NYXJrSW5mbwovTWFya2VkIHRydWUKPj4KL1N0cnVjdFRyZWVSb290IDMgMCBSCi9WaWV3ZXJQcmVmZXJlbmNlcyA0IDAgUgovTGFuZyAoZW4pCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9DcmVhdG9yIChDYW52YSkKL1Byb2R1Y2VyIChDYW52YSkKL0NyZWF0aW9uRGF0ZSAoRDoyMDIxMDkyNjEyMDQyMSswMCcwMCcpCi9Nb2REYXRlIChEOjIwMjEwOTI2MTIwNDIxKzAwJzAwJykKL0tleXdvcmRzIChEQUVyR19wRXNqYyxCQUVyRjkycEhiaykKL0F1dGhvciAoVGhhcmluZGEgUHJhYmhhdGgpCi9UaXRsZSAoQmx1ZSBHcmVlbiBSaWJib24gQWNoaWV2ZW1lbnQgQ2VydGlmaWNhdGUpCj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9UeXBlIC9QYWdlcwovQ291bnQgMQovS2lkcyBbNiAwIFJdCj4+CmVuZG9iagozIDAgb2JqCjw8Ci9UeXBlIC9TdHJ1Y3RUcmVlUm9vdAovSyA3IDAgUgovUGFyZW50VHJlZU5leHRLZXkgMQovUGFyZW50VHJlZSA4IDAgUgovSURUcmVlIDkgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9EaXNwbGF5RG9jVGl0bGUgdHJ1ZQo+PgplbmRvYmoKNiAwIG9iago8PAovVHlwZSAvUGFnZQovUmVzb3VyY2VzIDw8Ci9Qcm9jU2V0IFsvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJXQovRXh0R1N0YXRlIDw8Ci9HMyAxMCAwIFIKL0c3IDExIDAgUgo+PgovWE9iamVjdCA8PAovWDYgMTIgMCBSCj4+Ci9Gb250IDw8Ci9GNCAxMyAwIFIKL0Y1IDE0IDAgUgo+Pgo+PgovTWVkaWFCb3ggWzAuMCA3LjkyMDAwMSA3OTIuMCA2MTkuOTJdCi9Db250ZW50cyAxNSAwIFIKL1N0cnVjdFBhcmVudHMgMAovUGFyZW50IDIgMCBSCi9CbGVlZEJveCBb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vTac3YTpksAvdqYunbyggrr10EXpLra+Okonaq4huf8C2jEgVw0KZW5kc3RyZWFtCmVuZG9iagoxNiAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvRGl2Ci9QIDcgMCBSCi9LIFszMSAwIFJdCi9JRCAobm9kZTAwMDk1MTM1KQo+PgplbmRvYmoKMTcgMCBvYmoKPDwKL1R5cGUgL1N0cnVjdEVsZW0KL1MgL05vblN0cnVjdAovUCAzMiAwIFIKL0sgWzMzIDAgUl0KL0lEIChub2RlMDAwOTUxNTQpCj4+CmVuZG9iagoxOCAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvTm9uU3RydWN0Ci9QIDM0IDAgUgovSyBbMzUgMCBSXQovSUQgKG5vZGUwMDA5NTE2MykKPj4KZW5kb2JqCjE5IDAgb2JqCjw8Ci9UeXBlIC9TdHJ1Y3RFbGVtCi9TIC9Ob25TdHJ1Y3QKL1AgMzYgMCBSCi9LIFszNyAwIFJdCi9JRCAobm9kZTAwMDk1MTc0KQo+PgplbmRvYmoKMjAgMCBvYmoKPDwKL1R5cGUgL1N0cnVjdEVsZW0KL1MgL05vblN0cnVjdAovUCAzOCAwIFIKL0sgWzM5IDAgUl0KL0lEIChub2RlMDAwOTUxODMpCj4+CmVuZG9iagoyMSAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvRmlndXJlCi9QIDQwIDAgUgovSyBbNDEgMCBSXQovSUQgKG5vZGUwMDA5NTEzMikKPj4KZW5kb2JqCjIyIDAgb2JqCjw8Ci9UeXBlIC9TdHJ1Y3RFbGVtCi9TIC9Ob25TdHJ1Y3QKL1AgNDIgMCBSCi9LIFs0MyAwIFJdCi9JRCAobm9kZTAwMDk1MjAwKQo+PgplbmRvYmoKMjMgMCBvYmoKPDwKL1R5cGUgL1N0cnVjdEVsZW0KL1MgL05vblN0cnVjdAovUCA0NCAwIFIKL0sgWzQ1IDAgUl0KL0lEIChub2RlMDAwOTUyMDYpCj4+CmVuZG9iagoyNCAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvTm9uU3RydWN0Ci9QIDQ2IDAgUgovSyBbNDcgMCBSXQovSUQgKG5vZGUwMDA5NTIxMikKPj4KZW5kb2JqCjI1IDAgb2JqCjw8Ci9UeXBlIC9TdHJ1Y3RFbGVtCi9TIC9Ob25TdHJ1Y3QKL1AgNDggMCBSCi9LIFs0OSAwIFJdCi9JRCAobm9kZTAwMDk1MjE4KQo+PgplbmRvYmoKMjYgMCBvYmoKPDwKL0xpbWl0cyBbKG5vZGUwMDA5NTEyNikgKG5vZGUwMDA5NTIxOCldCi9OYW1lcyBbKG5vZGUwMDA5NTEyNikgNyAwIFIgKG5vZGUwMDA5NTEyOCkgMzIgMCBSIChub2RlMDAwOTUxMjkpIDM0IDAgUiAobm9kZTAwMDk1MTMwKSAzNiAwIFIgKG5vZGUwMDA5NTEzMSkgMzggMCBSCihub2RlMDAwOTUxMzIpIDIxIDAgUiAobm9kZTAwMDk1MTM1KSAxNiAwIFIgKG5vZGUwMDA5NTEzNikgMzEgMCBSIChub2RlMDAwOTUxMzcpIDUwIDAgUiAobm9kZTAwMDk1MTM4KSA1MSAwIFIKKG5vZGUwMDA5NTEzOSkgNTIgMCBSIChub2RlMDAwOTUxNDApIDUzIDAgUiAobm9kZTAwMDk1MTQxKSA1NCAwIFIgKG5vZGUwMDA5NTE0OCkgNTUgMCBSIChub2RlMDAwOTUxNDkpIDU2IDAgUgoobm9kZTAwMDk1MTUwKSA1NyAwIFIgKG5vZGUwMDA5NTE1MSkgNTggMCBSIChub2RlMDAwOTUxNTIpIDU5IDAgUiAobm9kZTAwMDk1MTUzKSA2MCAwIFIgKG5vZGUwMDA5NTE1NCkgMTcgMCBSCihub2RlMDAwOTUxNTkpIDYxIDAgUiAobm9kZTAwMDk1MTYwKSA2MiAwIFIgKG5vZGUwMDA5NTE2MSkgNjMgMCBSIChub2RlMDAwOTUxNjIpIDY0IDAgUiAobm9kZTAwMDk1MTYzKSAxOCAwIFIKKG5vZGUwMDA5NTE2OCkgNjUgMCBSIChub2RlMDAwOTUxNjkpIDY2IDAgUiAobm9kZTAwMDk1MTcwKSA2NyAwIFIgKG5vZGUwMDA5NTE3MSkgNjggMCBSIChub2RlMDAwOTUxNzIpIDY5IDAgUgoobm9kZTAwMDk1MTczKSA3MCAwIFIgKG5vZGUwMDA5NTE3NCkgMTkgMCBSIChub2RlMDAwOTUxNzkpIDcxIDAgUiAobm9kZTAwMDk1MTgwKSA3MiAwIFIgKG5vZGUwMDA5NTE4MSkgNzMgMCBSCihub2RlMDAwOTUxODIpIDc0IDAgUiAobm9kZTAwMDk1MTgzKSAyMCAwIFIgKG5vZGUwMDA5NTE4NCkgNzUgMCBSIChub2RlMDAwOTUxODUpIDc2IDAgUiAobm9kZTAwMDk1MTg2KSA0MCAwIFIKKG5vZGUwMDA5NTE5NSkgNzcgMCBSIChub2RlMDAwOTUxOTYpIDc4IDAgUiAobm9kZTAwMDk1MTk3KSA3OSAwIFIgKG5vZGUwMDA5NTE5OCkgODAgMCBSIChub2RlMDAwOTUxOTkpIDQyIDAgUgoobm9kZTAwMDk1MjAwKSAyMiAwIFIgKG5vZGUwMDA5NTIwMSkgODEgMCBSIChub2RlMDAwOTUyMDIpIDgyIDAgUiAobm9kZTAwMDk1MjAzKSA4MyAwIFIgKG5vZGUwMDA5NTIwNCkgODQgMCBSCihub2RlMDAwOTUyMDUpIDQ0IDAgUiAobm9kZTAwMDk1MjA2KSAyMyAwIFIgKG5vZGUwMDA5NTIwNykgODUgMCBSIChub2RlMDAwOTUyMDgpIDg2IDAgUiAobm9kZTAwMDk1MjA5KSA4NyAwIFIKKG5vZGUwMDA5NTIxMCkgODggMCBSIChub2RlMDAwOTUyMTEpIDQ2IDAgUiAobm9kZTAwMDk1MjEyKSAyNCAwIFIgKG5vZGUwMDA5NTIxMykgODkgMCBSIChub2RlMDAwOTUyMTQpIDkwIDAgUgoobm9kZTAwMDk1MjE1KSA5MSAwIFIgKG5vZGUwMDA5NTIxNikgOTIgMCBSIChub2RlMDAwOTUyMTcpIDQ4IDAgUiAobm9kZTAwMDk1MjE4KSAyNSAwIFJdCj4+CmVuZG9iagoyNyAwIG9iago8PAovVHlwZSAvRm9udAovRm9udERlc2NyaXB0b3IgOTMgMCBSCi9CYXNlRm9udCAvTGVhZ3VlU3BhcnRhbi1Cb2xkCi9TdWJ0eXBlIC9DSURGb250VHlwZTIKL0NJRFRvR0lETWFwIC9JZGVudGl0eQovQ0lEU3lzdGVtSW5mbyA8PAovUmVnaXN0cnkgKEFkb2JlKQovT3JkZXJpbmcgKElkZW50aXR5KQovU3VwcGxlbWVudCAwCj4+Ci9XIFswIFszNDIgMCAwIDI3M10KIDM2IFs3ODQgMCA3NTMgNzM4IDU4MCA1NjcgMCA3NjIgMzA4IDAKMCAwIDk0NiA4MjYgODc3IDY2NiAwIDcxNiA2NzIgNTk2CjAgNzg0XQpdCi9EVyAwCj4+CmVuZG9iagoyOCAwIG9iago8PAovTGVuZ3RoIDI4MAovRmlsdGVyIC9GbGF0ZURlY29kZQo+PgpzdHJlYW0NCnicXVHLasQwDLz7K3TcHhY7j922EAJtlkIOfdC0H5DYSmpoHOM4h/x9HSvdQgU2jKQZ2SNe1ZfaaA/8zU2yQQ+9NsrhPC1OInQ4aMOSFJSWfkfxlmNrGQ/kZp09jrXpJ1YUAPw9VGfvVjg8qKnDG8ZfnUKnzQCHz6oJuFms/cYRjQfByhIU9kHpubUv7YjAI+1Yq1DXfj0Gzl/Hx2oR0ogTeo2cFM62lehaMyArRIgSiqcQJUOj/tUzYnW9/Gpd7M5CtxCpKDeU5hHlSUTZfUSnc1TaOfmvwnVgeiYJ6s4zUnqkZEXJOxIUEWU0M79Q8kTJWxqW7sNIfvvB5vTVHrk4F5yJ64iWbGZog9eN2clurO38AMqfjlANCmVuZHN0cmVhbQplbmRvYmoKMjkgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0ZvbnREZXNjcmlwdG9yIDk0IDAgUgovQmFzZUZvbnQgL1NhbmNoZXotUmVndWxhcgovU3VidHlwZSAvQ0lERm9udFR5cGUyCi9DSURUb0dJRE1hcCAvSWRlbnRpdHkKL0NJRFN5c3RlbUluZm8gPDwKL1JlZ2lzdHJ5IChBZG9iZSkKL09yZGVyaW5nIChJZGVudGl0eSkKL1N1cHBsZW1lbnQgMAo+PgovVyBbMCAzIDMxMyA5IFs2NzRdCiAzOCBbNzUyIDc0MCA2NTMgMCAwIDgyMCAzNjJdCiA0OSBbODIwIDc5MyA2NTggMCA3MTUgNjY2IDcyNyAwIDg0OF0KIDY3Cls1ODAgNjEzIDUzOSA2MTIgNTM4IDM4NyAwIDYyMSAyOTNdCiA4MCBbNjIxIDU3NSAwIDAgNDIxIDAgNDAxIDYwOCAwIDAKMCA1OTBdCl0KL0RXIDAKPj4KZW5kb2JqCjMwIDAgb2JqCjw8Ci9MZW5ndGggMzE4Ci9GaWx0ZXIgL0ZsYXRlRGVjb2RlCj4+CnN0cmVhbQ0KeJxdkstugzAQRff+Ci/TRcTTJJEQUkpbiUUfKukHEHtILRVjGWfB39fMkFSqJbDOjO+dwUNUN0+N0Z5HH26ULXjea6McTOPVSeBnuGjDkpQrLf1K+JZDZ1kUxO08eRga04+sLDmPPkN28m7mm6Maz/DAonenwGlz4Zuvug3cXq39gQGM5zGrKq6gD06vnX3rBuARyraNCnnt523Q/J04zRZ4ipxQN3JUMNlOguvMBVgZh1Xx8iWsioFR//KCVOdefncOT2fhdByncYV0ICqQMiJBJHKkXUr0SHTAKqvf/uZ+byY4oeEetzxDbUratKbgnoolSBn1kz9TUFBwR41Q6Ty76ZatSCh4pCBZF+QpYtKRdUGegloS5LnL1w+glpcbWyZ7H4e8OhcmgePHESyXrw3c/xA72kW1PL8/haRNDQplbmRzdHJlYW0KZW5kb2JqCjMxIDAgb2JqCjw8Ci9UeXBlIC9TdHJ1Y3RFbGVtCi9TIC9EaXYKL1AgMTYgMCBSCi9LIFs1MCAwIFJdCi9JRCAobm9kZTAwMDk1MTM2KQo+PgplbmRvYmoKMzIgMCBvYmoKPDwKL1R5cGUgL1N0cnVjdEVsZW0KL1MgL1AKL1AgNjAgMCBSCi9LIFsxNyAwIFJdCi9JRCAobm9kZTAwMDk1MTI4KQo+PgplbmRvYmoKMzMgMCBvYmoKPDwKL1R5cGUgL01DUgovUGcgNiAwIFIKL01DSUQgMAo+PgplbmRvYmoKMzQgMCBvYmoKPDwKL1R5cGUgL1N0cnVjdEVsZW0KL1MgL1AKL1AgNjQgMCBSCi9LIFsxOCAwIFJdCi9JRCAobm9kZTAwMDk1MTI5KQo+PgplbmRvYmoKMzUgMCBvYmoKPDwKL1R5cGUgL01DUgovUGcgNiAwIFIKL01DSUQgMQo+PgplbmRvYmoKMzYgMCBvYmoKPDwKL1R5cGUgL1N0cnVjdEVsZW0KL1MgL1AKL1AgNzAgMCBSCi9LIFsxOSAwIFJdCi9JRCAobm9kZTAwMDk1MTMwKQo+PgplbmRvYmoKMzcgMCBvYmoKPDwKL1R5cGUgL01DUgovUGcgNiAwIFIKL01DSUQgMgo+PgplbmRvYmoKMzggMCBvYmoKPDwKL1R5cGUgL1N0cnVjdEVsZW0KL1MgL1AKL1AgNzQgMCBSCi9LIFsyMCAwIFJdCi9JRCAobm9kZTAwMDk1MTMxKQo+PgplbmRvYmoKMzkgMCBvYmoKPDwKL1R5cGUgL01DUgovUGcgNiAwIFIKL01DSUQgMwo+PgplbmRvYmoKNDAgMCBvYmoKPDwKL1R5cGUgL1N0cnVjdEVsZW0KL1MgL0RpdgovUCA3NiAwIFIKL0sgWzIxIDAgUl0KL0lEIChub2RlMDAwOTUxODYpCj4+CmVuZG9iago0MSAwIG9iago8PAovVHlwZSAvTUNSCi9QZyA2IDAgUgovTUNJRCA0Cj4+CmVuZG9iago0MiAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvUAovUCA4MCAwIFIKL0sgWzIyIDAgUl0KL0lEIChub2RlMDAwOTUxOTkpCj4+CmVuZG9iago0MyAwIG9iago8PAovVHlwZSAvTUNSCi9QZyA2IDAgUgovTUNJRCA1Cj4+CmVuZG9iago0NCAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvUAovUCA4NCAwIFIKL0sgWzIzIDAgUl0KL0lEIChub2RlMDAwOTUyMDUpCj4+CmVuZG9iago0NSAwIG9iago8PAovVHlwZSAvTUNSCi9QZyA2IDAgUgovTUNJRCA2Cj4+CmVuZG9iago0NiAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvUAovUCA4OCAwIFIKL0sgWzI0IDAgUl0KL0lEIChub2RlMDAwOTUyMTEpCj4+CmVuZG9iago0NyAwIG9iago8PAovVHlwZSAvTUNSCi9QZyA2IDAgUgovTUNJRCA3Cj4+CmVuZG9iago0OCAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvUAovUCA5MiAwIFIKL0sgWzI1IDAgUl0KL0lEIChub2RlMDAwOTUyMTcpCj4+CmVuZG9iago0OSAwIG9iago8PAovVHlwZSAvTUNSCi9QZyA2IDAgUgovTUNJRCA4Cj4+CmVuZG9iago1MCAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvRGl2Ci9QIDMxIDAgUgovSyBbNTEgMCBSXQovSUQgKG5vZGUwMDA5NTEzNykKPj4KZW5kb2JqCjUxIDAgb2JqCjw8Ci9UeXBlIC9TdHJ1Y3RFbGVtCi9TIC9EaXYKL1AgNTAgMCBSCi9LIFs1MiAwIFJdCi9JRCAobm9kZTAwMDk1MTM4KQo+PgplbmRvYmoKNTIgMCBvYmoKPDwKL1R5cGUgL1N0cnVjdEVsZW0KL1MgL0RpdgovUCA1MSAwIFIKL0sgWzUzIDAgUl0KL0lEIChub2RlMDAwOTUxMzkpCj4+CmVuZG9iago1MyAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvRGl2Ci9QIDUyIDAgUgovSyBbNTQgMCBSXQovSUQgKG5vZGUwMDA5NTE0MCkKPj4KZW5kb2JqCjU0IDAgb2JqCjw8Ci9UeXBlIC9TdHJ1Y3RFbGVtCi9TIC9EaXYKL1AgNTMgMCBSCi9LIFs1NSAwIFIgNjUgMCBSIDc1IDAgUiA3NyAwIFIgODEgMCBSIDg1IDAgUiA4OSAwIFJdCi9JRCAobm9kZTAwMDk1MTQxKQo+PgplbmRvYmoKNTUgMCBvYmoKPDwKL1R5cGUgL1N0cnVjdEVsZW0KL1MgL0RpdgovUCA1NCAwIFIKL0sgWzU2IDAgUl0KL0lEIChub2RlMDAwOTUxNDgpCj4+CmVuZG9iago1NiAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvRGl2Ci9QIDU1IDAgUgovSyBbNTcgMCBSIDYxIDAgUl0KL0lEIChub2RlMDAwOTUxNDkpCj4+CmVuZG9iago1NyAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvRGl2Ci9QIDU2IDAgUgovSyBbNTggMCBSXQovSUQgKG5vZGUwMDA5NTE1MCkKPj4KZW5kb2JqCjU4IDAgb2JqCjw8Ci9UeXBlIC9TdHJ1Y3RFbGVtCi9TIC9EaXYKL1AgNTcgMCBSCi9LIFs1OSAwIFJdCi9JRCAobm9kZTAwMDk1MTUxKQo+PgplbmRvYmoKNTkgMCBvYmoKPDwKL1R5cGUgL1N0cnVjdEVsZW0KL1MgL0RpdgovUCA1OCAwIFIKL0sgWzYwIDAgUl0KL0lEIChub2RlMDAwOTUxNTIpCj4+CmVuZG9iago2MCAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvRGl2Ci9QIDU5IDAgUgovSyBbMzIgMCBSXQovSUQgKG5vZGUwMDA5NTE1MykKPj4KZW5kb2JqCjYxIDAgb2JqCjw8Ci9UeXBlIC9TdHJ1Y3RFbGVtCi9TIC9EaXYKL1AgNTYgMCBSCi9LIFs2MiAwIFJdCi9JRCAobm9kZTAwMDk1MTU5KQo+PgplbmRvYmoKNjIgMCBvYmoKPDwKL1R5cGUgL1N0cnVjdEVsZW0KL1MgL0RpdgovUCA2MSAwIFIKL0sgWzYzIDAgUl0KL0lEIChub2RlMDAwOTUxNjApCj4+CmVuZG9iago2MyAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvRGl2Ci9QIDYyIDAgUgovSyBbNjQgMCBSXQovSUQgKG5vZGUwMDA5NTE2MSkKPj4KZW5kb2JqCjY0IDAgb2JqCjw8Ci9UeXBlIC9TdHJ1Y3RFbGVtCi9TIC9EaXYKL1AgNjMgMCBSCi9LIFszNCAwIFJdCi9JRCAobm9kZTAwMDk1MTYyKQo+PgplbmRvYmoKNjUgMCBvYmoKPDwKL1R5cGUgL1N0cnVjdEVsZW0KL1MgL0RpdgovUCA1NCAwIFIKL0sgWzY2IDAgUl0KL0lEIChub2RlMDAwOTUxNjgpCj4+CmVuZG9iago2NiAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvRGl2Ci9QIDY1IDAgUgovSyBbNjcgMCBSIDcxIDAgUl0KL0lEIChub2RlMDAwOTUxNjkpCj4+CmVuZG9iago2NyAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvRGl2Ci9QIDY2IDAgUgovSyBbNjggMCBSXQovSUQgKG5vZGUwMDA5NTE3MCkKPj4KZW5kb2JqCjY4IDAgb2JqCjw8Ci9UeXBlIC9TdHJ1Y3RFbGVtCi9TIC9EaXYKL1AgNjcgMCBSCi9LIFs2OSAwIFJdCi9JRCAobm9kZTAwMDk1MTcxKQo+PgplbmRvYmoKNjkgMCBvYmoKPDwKL1R5cGUgL1N0cnVjdEVsZW0KL1MgL0RpdgovUCA2OCAwIFIKL0sgWzcwIDAgUl0KL0lEIChub2RlMDAwOTUxNzIpCj4+CmVuZG9iago3MCAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvRGl2Ci9QIDY5IDAgUgovSyBbMzYgMCBSXQovSUQgKG5vZGUwMDA5NTE3MykKPj4KZW5kb2JqCjcxIDAgb2JqCjw8Ci9UeXBlIC9TdHJ1Y3RFbGVtCi9TIC9EaXYKL1AgNjYgMCBSCi9LIFs3MiAwIFJdCi9JRCAobm9kZTAwMDk1MTc5KQo+PgplbmRvYmoKNzIgMCBvYmoKPDwKL1R5cGUgL1N0cnVjdEVsZW0KL1MgL0RpdgovUCA3MSAwIFIKL0sgWzczIDAgUl0KL0lEIChub2RlMDAwOTUxODApCj4+CmVuZG9iago3MyAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvRGl2Ci9QIDcyIDAgUgovSyBbNzQgMCBSXQovSUQgKG5vZGUwMDA5NTE4MSkKPj4KZW5kb2JqCjc0IDAgb2JqCjw8Ci9UeXBlIC9TdHJ1Y3RFbGVtCi9TIC9EaXYKL1AgNzMgMCBSCi9LIFszOCAwIFJdCi9JRCAobm9kZTAwMDk1MTgyKQo+PgplbmRvYmoKNzUgMCBvYmoKPDwKL1R5cGUgL1N0cnVjdEVsZW0KL1MgL0RpdgovUCA1NCAwIFIKL0sgWzc2IDAgUl0KL0lEIChub2RlMDAwOTUxODQpCj4+CmVuZG9iago3NiAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvRGl2Ci9QIDc1IDAgUgovSyBbNDAgMCBSXQovSUQgKG5vZGUwMDA5NTE4NSkKPj4KZW5kb2JqCjc3IDAgb2JqCjw8Ci9UeXBlIC9TdHJ1Y3RFbGVtCi9TIC9EaXYKL1AgNTQgMCBSCi9LIFs3OCAwIFJdCi9JRCAobm9kZTAwMDk1MTk1KQo+PgplbmRvYmoKNzggMCBvYmoKPDwKL1R5cGUgL1N0cnVjdEVsZW0KL1MgL0RpdgovUCA3NyAwIFIKL0sgWzc5IDAgUl0KL0lEIChub2RlMDAwOTUxOTYpCj4+CmVuZG9iago3OSAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvRGl2Ci9QIDc4IDAgUgovSyBbODAgMCBSXQovSUQgKG5vZGUwMDA5NTE5NykKPj4KZW5kb2JqCjgwIDAgb2JqCjw8Ci9UeXBlIC9TdHJ1Y3RFbGVtCi9TIC9EaXYKL1AgNzkgMCBSCi9LIFs0MiAwIFJdCi9JRCAobm9kZTAwMDk1MTk4KQo+PgplbmRvYmoKODEgMCBvYmoKPDwKL1R5cGUgL1N0cnVjdEVsZW0KL1MgL0RpdgovUCA1NCAwIFIKL0sgWzgyIDAgUl0KL0lEIChub2RlMDAwOTUyMDEpCj4+CmVuZG9iago4MiAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvRGl2Ci9QIDgxIDAgUgovSyBbODMgMCBSXQovSUQgKG5vZGUwMDA5NTIwMikKPj4KZW5kb2JqCjgzIDAgb2JqCjw8Ci9UeXBlIC9TdHJ1Y3RFbGVtCi9TIC9EaXYKL1AgODIgMCBSCi9LIFs4NCAwIFJdCi9JRCAobm9kZTAwMDk1MjAzKQo+PgplbmRvYmoKODQgMCBvYmoKPDwKL1R5cGUgL1N0cnVjdEVsZW0KL1MgL0RpdgovUCA4MyAwIFIKL0sgWzQ0IDAgUl0KL0lEIChub2RlMDAwOTUyMDQpCj4+CmVuZG9iago4NSAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvRGl2Ci9QIDU0IDAgUgovSyBbODYgMCBSXQovSUQgKG5vZGUwMDA5NTIwNykKPj4KZW5kb2JqCjg2IDAgb2JqCjw8Ci9UeXBlIC9TdHJ1Y3RFbGVtCi9TIC9EaXYKL1AgODUgMCBSCi9LIFs4NyAwIFJdCi9JRCAobm9kZTAwMDk1MjA4KQo+PgplbmRvYmoKODcgMCBvYmoKPDwKL1R5cGUgL1N0cnVjdEVsZW0KL1MgL0RpdgovUCA4NiAwIFIKL0sgWzg4IDAgUl0KL0lEIChub2RlMDAwOTUyMDkpCj4+CmVuZG9iago4OCAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvRGl2Ci9QIDg3IDAgUgovSyBbNDYgMCBSXQovSUQgKG5vZGUwMDA5NTIxMCkKPj4KZW5kb2JqCjg5IDAgb2JqCjw8Ci9UeXBlIC9TdHJ1Y3RFbGVtCi9TIC9EaXYKL1AgNTQgMCBSCi9LIFs5MCAwIFJdCi9JRCAobm9kZTAwMDk1MjEzKQo+PgplbmRvYmoKOTAgMCBvYmoKPDwKL1R5cGUgL1N0cnVjdEVsZW0KL1MgL0RpdgovUCA4OSAwIFIKL0sgWzkxIDAgUl0KL0lEIChub2RlMDAwOTUyMTQpCj4+CmVuZG9iago5MSAwIG9iago8PAovVHlwZSAvU3RydWN0RWxlbQovUyAvRGl2Ci9QIDkw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NzI5NiAwMDAwMCBuDQowMDAwMDA4Nzc0IDAwMDAwIG4NCjAwMDAwMDkwODkgMDAwMDAgbg0KMDAwMDAwOTQ0NCAwMDAwMCBuDQowMDAwMDA5ODI2IDAwMDAwIG4NCjAwMDAwMTAyMTkgMDAwMDAgbg0KMDAwMDAxMDMwOCAwMDAwMCBuDQowMDAwMDEwMzk1IDAwMDAwIG4NCjAwMDAwMTA0NDYgMDAwMDAgbg0KMDAwMDAxMDUzMyAwMDAwMCBuDQowMDAwMDEwNTg0IDAwMDAwIG4NCjAwMDAwMTA2NzEgMDAwMDAgbg0KMDAwMDAxMDcyMiAwMDAwMCBuDQowMDAwMDEwODA5IDAwMDAwIG4NCjAwMDAwMTA4NjAgMDAwMDAgbg0KMDAwMDAxMDk0OSAwMDAwMCBuDQowMDAwMDExMDAwIDAwMDAwIG4NCjAwMDAwMTEwODcgMDAwMDAgbg0KMDAwMDAxMTEzOCAwMDAwMCBuDQowMDAwMDExMjI1IDAwMDAwIG4NCjAwMDAwMTEyNzYgMDAwMDAgbg0KMDAwMDAxMTM2MyAwMDAwMCBuDQowMDAwMDExNDE0IDAwMDAwIG4NCjAwMDAwMTE1MDEgMDAwMDAgbg0KMDAwMDAxMTU1MiAwMDAwMCBuDQowMDAwMDExNjQxIDAwMDAwIG4NCjAwMDAwMTE3MzAgMDAwMDAgbg0KMDAwMDAxMTgxOSAwMDAwMCBuDQowMDAwMDExOTA4IDAwMDAwIG4NCjAwMDAwMTIwMzkgMDAwMDAgbg0KMDAwMDAxMjEyOCAwMDAwMCBuDQowMDAwMDEyMjI0IDAwMDAwIG4NCjAwMDAwMTIzMTMgMDAwMDAgbg0KMDAwMDAxMjQwMiAwMDAwMCBuDQowMDAwMDEyNDkxIDAwMDAwIG4NCjAwMDAwMTI1ODAgMDAwMDAgbg0KMDAwMDAxMjY2OSAwMDAwMCBuDQowMDAwMDEyNzU4IDAwMDAwIG4NCjAwMDAwMTI4NDcgMDAwMDAgbg0KMDAwMDAxMjkzNiAwMDAwMCBuDQowMDAwMDEzMDI1IDAwMDAwIG4NCjAwMDAwMTMxMjEgMDAwMDAgbg0KMDAwMDAxMzIxMCAwMDAwMCBuDQowMDAwMDEzMjk5IDAwMDAwIG4NCjAwMDAwMTMzODggMDAwMDAgbg0KMDAwMDAxMzQ3NyAwMDAwMCBuDQowMDAwMDEzNTY2IDAwMDAwIG4NCjAwMDAwMTM2NTUgMDAwMDAgbg0KMDAwMDAxMzc0NCAwMDAwMCBuDQowMDAwMDEzODMzIDAwMDAwIG4NCjAwMDAwMTM5MjIgMDAwMDAgbg0KMDAwMDAxNDAxMSAwMDAwMCBuDQowMDAwMDE0MTAwIDAwMDAwIG4NCjAwMDAwMTQxODkgMDAwMDAgbg0KMDAwMDAxNDI3OCAwMDAwMCBuDQowMDAwMDE0MzY3IDAwMDAwIG4NCjAwMDAwMTQ0NTYgMDAwMDAgbg0KMDAwMDAxNDU0NSAwMDAwMCBuDQowMDAwMDE0NjM0IDAwMDAwIG4NCjAwMDAwMTQ3MjMgMDAwMDAgbg0KMDAwMDAxNDgxMiAwMDAwMCBuDQowMDAwMDE0OTAxIDAwMDAwIG4NCjAwMDAwMTQ5OTAgMDAwMDAgbg0KMDAwMDAxNTA3OSAwMDAwMCBuDQowMDAwMDE1MTY4IDAwMDAwIG4NCjAwMDAwMTUyNTcgMDAwMDAgbg0KMDAwMDAxNTM0NiAwMDAwMCBuDQowMDAwMDE1NDM1IDAwMDAwIG4NCjAwMDAwMTU2MzUgMDAwMDAgbg0KMDAwMDAxNTgzMiAwMDAwMCBuDQowMDAwMDE3MzQ3IDAwMDAwIG4NCnRyYWlsZXIKPDwKL1NpemUgOTcKL1Jvb3QgMSAwIFIKL0luZm8gNSAwIFIKL0lEIFs8NUU2NEZEQ0VCRjQ0OUU5MTE2NEY3MjNCN0FENDc2QTM+IDw1RTY0RkRDRUJGNDQ5RTkxMTY0RjcyM0I3QUQ0NzZBMz5dCj4+CnN0YXJ0eHJlZgoyMDE2NAolJUVPRgo=";
const CertificateView = () => {
  const [certificate, setCertificate] = useState<CertificateDto>();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);
  const [pageUrl, setPageUrl] = useState<string>("");
  const { VerifiedBadge, StatusBadge } = useBadge();
  const SHARE_ICON_SIZE = 36;
  const dispatch = useDispatch();
  const { setLoading } = bindActionCreators(actionCreators, dispatch);
  const loading = useSelector(
    (state: ReducerType) => state.loadingReducer.loading
  );
  const [pdfCertificateUri, setPdfCertificateUri] = useState("");

  useEffect(() => {
    const currentUrl = window.location.href;
    setPageUrl(currentUrl);
    const certificateIdFromUrl = currentUrl.replace(
      "https://symetry-certify-frontend.herokuapp.com/certificate/view?id=",
      ""
    );

    // Production ->  https://symetry-certify-frontend.herokuapp.com/certificate/view?id=
    // Dev ->         http://localhost:3000/certificate/view?id=

    setLoading(true);
    fetchCertificate(certificateIdFromUrl)
      .then((res) => {
        const certificate = getCertificateDto(res.data);
        setCertificate(certificate);
        generatePdf(certificate);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const generatePdf = async (certificate: CertificateDto) => {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const firstPage = pdfDoc.getPages()[0];
    firstPage.drawText(`${certificate.user.fname} ${certificate.user.lname}`, {
      x: 273,
      y: 280,
      size: 42,
      font: helveticaFont,
      color: rgb(0.26, 0.65, 0.96),
      maxWidth: 480,
    });

    firstPage.drawText(
      `for ${certificate.reason} on ${certificate.issuedDate}`,
      {
        x: 273,
        y: 230,
        size: 16,
        font: helveticaFont,
        maxWidth: 470,
      }
    );

    firstPage.drawText(` ${certificate.id}`, {
      x: 230,
      y: 60,
      size: 16,
      font: helveticaFont,
    });

    firstPage.drawText(
      ` https://symetry-certify-frontend.herokuapp.com/certificate/verify`,
      {
        x: 230,
        y: 30,
        size: 16,
        font: helveticaFont,
      }
    );

    // const p = await pdfDoc.save();
    const uri = await pdfDoc.saveAsBase64({ dataUri: true });
    setPdfCertificateUri(uri);
  };

  // const handleDownload = () => {
  //   const input = document.getElementById("certificate");
  //   html2canvas(input!).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF({
  //       orientation: "p",
  //       compress: false,
  //       unit: "em",
  //       format: "a4",
  //     });
  //     pdf.addImage(imgData, "JPEG", 0, 0, 49.5, 35);
  //     pdf.save("certify certificate.pdf");
  //   });
  // };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="certificate-view">
      <LoadingLinearProgress />
      {loading ? (
        <div style={{ color: "black", textAlign: "center", marginTop: "10em" }}>
          <CircularProgress />
          <p>Loading. Moment Please...</p>
        </div>
      ) : (
        <div className="certificate-view__content">
          <div id="certificate" className="certificate-container">
            {/* <Certificate certificate={certificate} /> */}
            {pdfCertificateUri && (
              <iframe
                src={pdfCertificateUri}
                width={900}
                height={500}
                title="certificate"
              ></iframe>
            )}
          </div>
          <div className="actions-container">
            {/* <Button
              className={buttonStyles.standardBtn}
              onClick={handleDownload}
            >
              <GetAppIcon />
              Download
            </Button> */}
            <Button
              variant="contained"
              style={{ textTransform: "capitalize" }}
              onClick={() => setShareDialogOpen(!shareDialogOpen)}
            >
              <ShareIcon />
              Share
            </Button>
            <Button
              style={{ textTransform: "capitalize" }}
              variant="contained"
              onClick={() => certificate && setDrawerOpen(!drawerOpen)}
            >
              More Info <NavigateNextIcon />
            </Button>
          </div>
        </div>
      )}

      <SwipeableDrawer
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
      >
        <div className="drawer">
          <div className="drawer__top">
            <Button className="close-btn" onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </Button>
          </div>
          <div className="drawer__body">
            <Tooltip
              title="certificate ID: click to copy"
              children={
                <Button
                  className="certificate-id-btn"
                  style={{ textTransform: "lowercase" }}
                  variant="contained"
                  onClick={() => copyToClipboard(certificate?.id!)}
                >
                  {certificate?.id}
                </Button>
              }
            />

            <div className="about-reciever">
              <h4>About reciever</h4>
              <div className="block-form-container">
                <div
                  className="block-form-container__left-col"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5em",
                  }}
                >
                  <p className="key">First Name</p>
                  <p className="key">Last Name</p>
                  <p className="key">Verification Status</p>
                  <p className="key">Member Status</p>
                </div>
                <div
                  className="block-form-container__right-col"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5em",
                  }}
                >
                  <p className="value">{certificate?.user.fname}</p>
                  <p className="value">{certificate?.user.lname}</p>
                  <VerifiedBadge verified={certificate?.user.emailVerified!} />
                  <StatusBadge member={certificate?.user.member!} />
                </div>
              </div>
            </div>

            <div className="about-certificate">
              <h4>About certificate</h4>
              <div className="block-form-container">
                <div
                  className="block-form-container__left-col"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5em",
                  }}
                >
                  <p className="key">Issued On</p>
                  <p className="key">Type</p>
                </div>
                <div
                  className="block-form-container__right-col"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5em",
                  }}
                >
                  <p className="value">
                    {moment(certificate?.issuedDate, "YYYY-MM-DD").format(
                      "YYYY-MM-DD"
                    )}
                  </p>
                  <p className="value type">{certificate?.type}</p>
                </div>
              </div>

              {certificate?.reason && (
                <div className="section">
                  <p className="section__key">Reason</p>
                  <p className="section__value">{certificate?.reason}</p>
                </div>
              )}

              {certificate?.remarks && (
                <div className="section">
                  <p className="section__key">Remarks</p>
                  <p className="section__value">{certificate?.remarks}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </SwipeableDrawer>

      <Dialog onClose={() => setShareDialogOpen(false)} open={shareDialogOpen}>
        <DialogTitle>Share</DialogTitle>
        <DialogContent dividers>
          <div className="share">
            <div className="share__top">
              <TextField value={pageUrl} variant="outlined" />
              <Button
                variant="contained"
                className="copy-link-btn"
                onClick={() => copyToClipboard(pageUrl)}
              >
                Copy Link
              </Button>
            </div>
            <div className="share__body">
              <Tooltip
                children={
                  <FacebookShareButton url={pageUrl}>
                    <FacebookIcon size={SHARE_ICON_SIZE} round />
                  </FacebookShareButton>
                }
                title={"Facebook"}
              />

              <Tooltip
                children={
                  <WhatsappShareButton url={pageUrl}>
                    <WhatsappIcon size={SHARE_ICON_SIZE} round />
                  </WhatsappShareButton>
                }
                title={"Whatsapp"}
              />
              <Tooltip
                children={
                  <TwitterShareButton url={pageUrl}>
                    <TwitterIcon size={SHARE_ICON_SIZE} round />
                  </TwitterShareButton>
                }
                title={"Twitter"}
              />
              <Tooltip
                children={
                  <ViberShareButton url={pageUrl}>
                    <ViberIcon size={SHARE_ICON_SIZE} round />
                  </ViberShareButton>
                }
                title={"Viber"}
              />
              <Tooltip
                children={
                  <EmailShareButton url={pageUrl}>
                    <EmailIcon size={SHARE_ICON_SIZE} round />
                  </EmailShareButton>
                }
                title={"Email"}
              />
              <Tooltip
                children={
                  <RedditShareButton url={pageUrl}>
                    <RedditIcon size={SHARE_ICON_SIZE} round />
                  </RedditShareButton>
                }
                title={"Reddit"}
              />
              <Tooltip
                children={
                  <LinkedinShareButton url={pageUrl}>
                    <LinkedinIcon size={SHARE_ICON_SIZE} round />
                  </LinkedinShareButton>
                }
                title={"LinkedIn"}
              />
              <Tooltip
                children={
                  <TelegramShareButton url={pageUrl}>
                    <TelegramIcon size={SHARE_ICON_SIZE} round />
                  </TelegramShareButton>
                }
                title={"Telegram"}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CertificateView;
