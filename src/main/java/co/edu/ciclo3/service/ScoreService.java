/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.ciclo3.service;

import co.edu.ciclo3.model.Score;
import co.edu.ciclo3.repository.ScoreRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Usuario
 */
@Service
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;

    public List<Score> getAll() {
        return scoreRepository.getAll();
    }

    public Optional<Score> getScore(int id) {
        return scoreRepository.getScore(id);
    }

    public Score save(Score score) {
        if (score.getScore() > 0 && score.getScore() < 6 && score.getMessage().length() < 251) {
            if (score.getIdScore() == null) {
                return scoreRepository.save(score);
            } else {
                Optional<Score> scoreAux = scoreRepository.getScore(score.getIdScore());
                if ("".equals(scoreAux)) {
                    return scoreRepository.save(score);
                } else {
                    return score;
                }
            }
        } else {
            return score;
        }
    }

    public boolean delete(int id) {
        boolean score = scoreRepository.getScore(id).map(Score -> {
            scoreRepository.delete(Score);
            return true;
        }).orElse(false);
        return score;
    }

    public Score update(Score score) {
        if (score.getIdScore() != null) {
            Optional<Score> scoreConsultado = scoreRepository.getScore(score.getIdScore());
            if (scoreConsultado.isPresent()) {
                if ((score.getMessage() != null) && (score.getMessage() != null)
                        && (score.getReservation() != null) && (score.getScore() != null)) {
                    scoreConsultado.get().setMessage(score.getMessage());
                    scoreConsultado.get().setReservation(score.getReservation());
                    scoreConsultado.get().setScore(score.getScore());
                }
                return scoreRepository.save(scoreConsultado.get());
            }
        }
        return score;
    }

}
