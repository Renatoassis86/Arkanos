import asyncio
import edge_tts

async def main():
    text = "A grafia correta da palavra é sabedoria. s a b e d o r i a. sabedoria."
    communicate = edge_tts.Communicate(text, "pt-BR-FranciscaNeural", rate="-5%")
    await communicate.save("scratch/test_sabedoria.mp3")
    print("Saved scratch/test_sabedoria.mp3 successfully!")

if __name__ == "__main__":
    asyncio.run(main())
