from openai import OpenAI

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key="YOUR_NVIDIA_API_KEY", # Get this from build.nvidia.com
)

response = client.chat.completions.create(
    model="minimaxai/minimax-m2.7",
    messages=[
        {"role": "user", "content": "Explain multi-head causal self-attention in 1 sentence."}
    ],
    max_tokens=256
)

print(response.choices[0].message.content)