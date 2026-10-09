"""Deterministic provider selection; no unauthorized paid fallback."""
from dataclasses import dataclass
from typing import Literal

@dataclass(frozen=True)
class Worker:
    name: str
    capabilities: frozenset[str]
    available: bool
    paid: bool = False

def choose_worker(task: Literal["script","banner","video","audio"], workers: list[Worker], allow_paid: bool = False) -> str:
    candidates = [w for w in workers if w.available and task in w.capabilities and (allow_paid or not w.paid)]
    if not candidates:
        raise LookupError(f"No authorized available worker for {task}")
    candidates.sort(key=lambda w: (w.paid, w.name))
    return candidates[0].name

DEFAULT_WORKERS = [
    Worker("local-banner", frozenset({"banner"}), True),
    Worker("local-ffmpeg", frozenset({"audio"}), False),
    Worker("cloud-video", frozenset({"video"}), False, True),
    Worker("local-ollama", frozenset({"script"}), False),
]
